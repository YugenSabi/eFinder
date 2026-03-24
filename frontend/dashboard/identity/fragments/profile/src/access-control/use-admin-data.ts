'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getAdminPageData,
  updateUserRole,
} from './api';
import type { AdminUser } from './types';

export function useAdminData(enabled: boolean) {
  const [loading, setLoading] = useState(enabled);
  const [pageError, setPageError] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);

  const load = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setPageError(null);

    try {
      const data = await getAdminPageData();
      setUsers(data.users);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void load();
  }, [load]);

  const usersSorted = useMemo(
    () => [...users].sort((left, right) => right.email.localeCompare(left.email)),
    [users],
  );

  const changeUserRole = useCallback(async (userId: string, role: string) => {
    await updateUserRole(userId, role);

    setUsers((current) =>
      current.map((user) =>
        user.id === userId ? { ...user, role } : user,
      ),
    );
  }, []);

  return {
    loading,
    pageError,
    users: usersSorted,
    setPageError,
    load,
    changeUserRole,
  };
}
