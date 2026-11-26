import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export type UserFocusGoal =
  | 'Scholarships'
  | 'Freelancing & Remote Jobs'
  | 'AI Workflows'
  | 'All-in-One Growth';

export interface StoredBookmark {
  id: string;
  type: 'scholarship' | 'ai-tool' | 'freelancing' | 'blog' | 'resource';
  title: string;
  subtitle: string;
  path: string;
  savedAt: string;
  trackingStage?: 'Researching' | 'Preparing Docs' | 'Submitted' | 'Shortlisted';
  reminderDate?: string;
  notes?: string;
  deadline?: string;
  isExpired?: boolean;
}

export interface StoredUserRecord {
  id: string;
  name: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  country: string;
  focusGoal: UserFocusGoal;
  bio: string;
  createdAt: string;
  bookmarks: StoredBookmark[];
}

export interface PublicUserProfile {
  id: string;
  name: string;
  email: string;
  country: string;
  focusGoal: UserFocusGoal;
  bio: string;
  createdAt: string;
}

const VALID_FOCUS_GOALS: UserFocusGoal[] = [
  'Scholarships',
  'Freelancing & Remote Jobs',
  'AI Workflows',
  'All-in-One Growth',
];

const VALID_BOOKMARK_TYPES = new Set<StoredBookmark['type']>([
  'scholarship',
  'ai-tool',
  'freelancing',
  'blog',
  'resource',
]);

const VALID_TRACKING_STAGES = new Set<NonNullable<StoredBookmark['trackingStage']>>([
  'Researching',
  'Preparing Docs',
  'Submitted',
  'Shortlisted',
]);

// Process-scoped random fallback keeps signing secret strictly out of source code & client bundles
const EPHEMERAL_SECRET = crypto.randomBytes(32).toString('hex');

function getSessionSecret(): string {
  const configured = process.env.AUTH_SESSION_SECRET;
  if (configured && configured.trim().length >= 16) {
    return configured.trim();
  }
  return EPHEMERAL_SECRET;
}

function resolveStoreFilePath(): string {
  const baseDir =
    process.env.VERCEL === '1'
      ? path.resolve('/tmp', 'aspirehub-data')
      : path.resolve(process.cwd(), 'data');
  const targetPath = path.resolve(baseDir, 'users.json');
  if (!targetPath.startsWith(baseDir + path.sep)) {
    throw new Error('Invalid storage path configuration.');
  }
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  return targetPath;
}

let inMemoryFallbackUsers: StoredUserRecord[] = [];

function readUsers(): StoredUserRecord[] {
  try {
    const filePath = resolveStoreFilePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredUserRecord[]) : [];
  } catch {
    return inMemoryFallbackUsers;
  }
}

function writeUsers(users: StoredUserRecord[]): void {
  inMemoryFallbackUsers = users;
  try {
    const filePath = resolveStoreFilePath();
    const tmpPath = `${filePath}.${process.pid}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(users, null, 2), 'utf-8');
    fs.renameSync(tmpPath, filePath);
  } catch {
    // Fallback remains in memory if filesystem is read-only
  }
}

function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(derivedKey.toString('hex'));
    });
  });
}

async function verifyPassword(password: string, salt: string, expectedHash: string): Promise<boolean> {
  const computedHex = await hashPassword(password, salt);
  const a = Buffer.from(computedHex, 'hex');
  const b = Buffer.from(expectedHash, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

function signToken(user: Pick<StoredUserRecord, 'id' | 'email'>): string {
  const nowSec = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    sub: user.id,
    email: user.email,
    iat: nowSec,
    exp: nowSec + 60 * 60 * 24 * 7,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${sig}`;
}

function parseAndVerifyToken(token: string): TokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, providedSig] = parts;
  if (!payloadB64 || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payloadB64)
    .digest('base64url');

  const a = Buffer.from(providedSig, 'utf-8');
  const b = Buffer.from(expectedSig, 'utf-8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8')) as TokenPayload;
    if (!decoded || typeof decoded.sub !== 'string' || typeof decoded.exp !== 'number') {
      return null;
    }
    const nowSec = Math.floor(Date.now() / 1000);
    if (decoded.exp <= nowSec) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function sanitizePublicUser(record: StoredUserRecord): PublicUserProfile {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    country: record.country,
    focusGoal: record.focusGoal,
    bio: record.bio,
    createdAt: record.createdAt,
  };
}

function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 160;
}

export function sanitizeBookmarksArray(input: unknown): StoredBookmark[] {
  if (!Array.isArray(input)) return [];
  const cleaned: StoredBookmark[] = [];
  for (const raw of input.slice(0, 100)) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Record<string, unknown>;
    if (
      typeof item.id !== 'string' ||
      typeof item.type !== 'string' ||
      !VALID_BOOKMARK_TYPES.has(item.type as StoredBookmark['type']) ||
      typeof item.title !== 'string' ||
      typeof item.path !== 'string' ||
      !item.path.startsWith('/')
    ) {
      continue;
    }
    const bookmark: StoredBookmark = {
      id: item.id.slice(0, 120),
      type: item.type as StoredBookmark['type'],
      title: item.title.slice(0, 200),
      subtitle: typeof item.subtitle === 'string' ? item.subtitle.slice(0, 200) : '',
      path: item.path.slice(0, 200),
      savedAt: typeof item.savedAt === 'string' ? item.savedAt.slice(0, 40) : new Date().toISOString(),
    };
    if (
      typeof item.trackingStage === 'string' &&
      VALID_TRACKING_STAGES.has(item.trackingStage as NonNullable<StoredBookmark['trackingStage']>)
    ) {
      bookmark.trackingStage = item.trackingStage as StoredBookmark['trackingStage'];
    }
    if (typeof item.reminderDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.reminderDate)) {
      bookmark.reminderDate = item.reminderDate;
    }
    if (typeof item.notes === 'string') {
      bookmark.notes = item.notes.slice(0, 500);
    }
    if (typeof item.deadline === 'string') {
      bookmark.deadline = item.deadline.slice(0, 100);
    }
    if (typeof item.isExpired === 'boolean') {
      bookmark.isExpired = item.isExpired;
    }
    cleaned.push(bookmark);
  }
  return cleaned;
}

export class AuthActionError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function signupUser(input: {
  name?: unknown;
  email?: unknown;
  password?: unknown;
  bookmarks?: unknown;
}): Promise<{ token: string; user: PublicUserProfile; bookmarks: StoredBookmark[] }> {
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  const password = typeof input.password === 'string' ? input.password : '';

  if (name.length < 2 || name.length > 80) {
    throw new AuthActionError(400, 'Please enter your full name (2–80 characters).');
  }
  if (!isValidEmailFormat(email)) {
    throw new AuthActionError(400, 'Please enter a valid email address.');
  }
  if (password.length < 8 || password.length > 128) {
    throw new AuthActionError(400, 'Password must be between 8 and 128 characters.');
  }

  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    throw new AuthActionError(409, 'An account with this email already exists. Please sign in.');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = await hashPassword(password, salt);
  const initialBookmarks = sanitizeBookmarksArray(input.bookmarks);

  const newUser: StoredUserRecord = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordSalt: salt,
    passwordHash,
    country: '',
    focusGoal: 'All-in-One Growth',
    bio: '',
    createdAt: new Date().toISOString(),
    bookmarks: initialBookmarks,
  };

  writeUsers([newUser, ...users]);

  const token = signToken(newUser);
  return {
    token,
    user: sanitizePublicUser(newUser),
    bookmarks: newUser.bookmarks,
  };
}

export async function loginUser(input: {
  email?: unknown;
  password?: unknown;
}): Promise<{ token: string; user: PublicUserProfile; bookmarks: StoredBookmark[] }> {
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  const password = typeof input.password === 'string' ? input.password : '';

  if (!isValidEmailFormat(email) || password.length === 0) {
    throw new AuthActionError(400, 'Please enter both your email and password.');
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new AuthActionError(401, 'Invalid email or password.');
  }

  const ok = await verifyPassword(password, user.passwordSalt, user.passwordHash);
  if (!ok) {
    throw new AuthActionError(401, 'Invalid email or password.');
  }

  const token = signToken(user);
  return {
    token,
    user: sanitizePublicUser(user),
    bookmarks: user.bookmarks ?? [],
  };
}

export function requireAuthenticatedUser(authHeader?: string): StoredUserRecord {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthActionError(401, 'Authentication required.');
  }
  const token = authHeader.slice(7).trim();
  const payload = parseAndVerifyToken(token);
  if (!payload) {
    throw new AuthActionError(401, 'Your session has expired. Please sign in again.');
  }
  const users = readUsers();
  const user = users.find((u) => u.id === payload.sub && u.email === payload.email);
  if (!user) {
    throw new AuthActionError(401, 'Account not found. Please sign in again.');
  }
  return user;
}

export function updateUserProfile(
  userId: string,
  input: {
    name?: unknown;
    country?: unknown;
    focusGoal?: unknown;
    bio?: unknown;
  }
): PublicUserProfile {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) {
    throw new AuthActionError(404, 'Account not found.');
  }

  const current = users[idx];
  const nextName = typeof input.name === 'string' ? input.name.trim() : current.name;
  if (nextName.length < 2 || nextName.length > 80) {
    throw new AuthActionError(400, 'Name must be between 2 and 80 characters.');
  }

  const nextCountry =
    typeof input.country === 'string' ? input.country.trim().slice(0, 80) : current.country;
  const nextBio = typeof input.bio === 'string' ? input.bio.trim().slice(0, 300) : current.bio;
  const nextGoal =
    typeof input.focusGoal === 'string' && VALID_FOCUS_GOALS.includes(input.focusGoal as UserFocusGoal)
      ? (input.focusGoal as UserFocusGoal)
      : current.focusGoal;

  const updated: StoredUserRecord = {
    ...current,
    name: nextName,
    country: nextCountry,
    focusGoal: nextGoal,
    bio: nextBio,
  };

  users[idx] = updated;
  writeUsers(users);
  return sanitizePublicUser(updated);
}

export function updateUserBookmarks(userId: string, bookmarksInput: unknown): StoredBookmark[] {
  if (!Array.isArray(bookmarksInput)) {
    throw new AuthActionError(400, 'Bookmarks payload must be an array.');
  }
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) {
    throw new AuthActionError(404, 'Account not found.');
  }
  const cleaned = sanitizeBookmarksArray(bookmarksInput);
  users[idx] = {
    ...users[idx],
    bookmarks: cleaned,
  };
  writeUsers(users);
  return cleaned;
}
