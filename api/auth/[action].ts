import {
  AuthActionError,
  loginUser,
  requireAuthenticatedUser,
  sanitizePublicUser,
  signupUser,
  updateUserBookmarks,
  updateUserProfile,
} from '../../server/authCore';

interface VercelRequestLike {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
}

interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  json: (payload: unknown) => void;
}

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  const rawAction = req.query?.action;
  const action = Array.isArray(rawAction) ? rawAction[0] : rawAction;
  const authHeaderRaw = req.headers?.authorization;
  const authHeader = Array.isArray(authHeaderRaw) ? authHeaderRaw[0] : authHeaderRaw;

  try {
    if (action === 'signup' && req.method === 'POST') {
      const body = (req.body ?? {}) as Record<string, unknown>;
      const result = await signupUser(body);
      res.status(201).json(result);
      return;
    }

    if (action === 'login' && req.method === 'POST') {
      const body = (req.body ?? {}) as Record<string, unknown>;
      const result = await loginUser(body);
      res.status(200).json(result);
      return;
    }

    if (action === 'me' && req.method === 'GET') {
      const user = requireAuthenticatedUser(authHeader);
      res.status(200).json({
        user: sanitizePublicUser(user),
        bookmarks: user.bookmarks ?? [],
      });
      return;
    }

    if (action === 'profile' && req.method === 'PUT') {
      const user = requireAuthenticatedUser(authHeader);
      const body = (req.body ?? {}) as Record<string, unknown>;
      const updated = updateUserProfile(user.id, body);
      res.status(200).json({ user: updated });
      return;
    }

    if (action === 'bookmarks' && req.method === 'PUT') {
      const user = requireAuthenticatedUser(authHeader);
      const body = (req.body ?? {}) as { bookmarks?: unknown };
      const saved = updateUserBookmarks(user.id, body.bookmarks);
      res.status(200).json({ bookmarks: saved });
      return;
    }

    res.status(405).json({ error: 'Method or auth action not supported.' });
  } catch (err: unknown) {
    if (err instanceof AuthActionError) {
      res.status(err.status).json({ error: err.message });
      return;
    }
    res.status(500).json({ error: 'Authentication service error. Please try again.' });
  }
}
