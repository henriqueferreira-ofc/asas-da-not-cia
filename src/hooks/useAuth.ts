import { useState, useEffect } from 'react';
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

  useEffect(() => {
    let mounted = true;

    const checkUserRoles = async (userId: string) => {
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
    };

    // Listener for ONGOING auth changes — do NOT await inside to avoid deadlock
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        const user = session?.user || null;
        
        // Update session/user immediately (synchronous)
        setState(prev => ({
          ...prev,
          user,
          session,
        }));

        // Fetch roles asynchronously via setTimeout to avoid Supabase deadlock
        if (user) {
          setTimeout(() => {
            checkUserRoles(user.id).then(roles => {
              if (mounted) {
                setState(prev => ({
                  ...prev,
                  isAdmin: roles.isAdmin,
                  isEditor: roles.isEditor,
                }));
              }
            });
          }, 0);
        } else {
          setState(prev => ({
            ...prev,
            isAdmin: false,
            isEditor: false,
          }));
        }
      }
    );

    // INITIAL load — controls isLoading
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;

        const user = session?.user || null;

        if (user) {
          const roles = await checkUserRoles(user.id);
          if (mounted) {
            setState({
              user,
              session,
              isLoading: false,
              isAdmin: roles.isAdmin,
              isEditor: roles.isEditor,
            });
          }
        } else {
          if (mounted) {
            setState({
              user: null,
              session: null,
              isLoading: false,
              isAdmin: false,
              isEditor: false,
            });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
  };
}
