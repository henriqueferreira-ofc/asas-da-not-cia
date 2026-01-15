import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAdmin: false,
    isEditor: false,
  });

  const checkUserRoles = useCallback(async (userId: string) => {
    try {
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error checking user roles:', error);
        return { isAdmin: false, isEditor: false };
      }

      const roleList = roles?.map(r => r.role) || [];
      return {
        isAdmin: roleList.includes('admin'),
        isEditor: roleList.includes('editor') || roleList.includes('admin'),
      };
    } catch (error) {
      console.error('Error checking user roles:', error);
      return { isAdmin: false, isEditor: false };
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user || null;
        
        if (user) {
          const { isAdmin, isEditor } = await checkUserRoles(user.id);
          setState({
            user,
            session,
            isLoading: false,
            isAdmin,
            isEditor,
          });
        } else {
          setState({
            user: null,
            session: null,
            isLoading: false,
            isAdmin: false,
            isEditor: false,
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user || null;
      
      if (user) {
        const { isAdmin, isEditor } = await checkUserRoles(user.id);
        setState({
          user,
          session,
          isLoading: false,
          isAdmin,
          isEditor,
        });
      } else {
        setState({
          user: null,
          session: null,
          isLoading: false,
          isAdmin: false,
          isEditor: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [checkUserRoles]);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
  };
}
