import { redirect } from "react-router";

import { logout } from "~/.server/sessions";
import type { Route } from "./+types/logoutRoute";

/**
 * Action function for the logout route.
 * Handles the logout process when a POST request is made to this route.
 *
 * @param {Route.ActionArgs} params - The action arguments.
 * @returns {Promise<Response>} Redirect response after logging out.
 * @see https://reactrouter.com/en/dev/route/action
 */
export async function action({ request }: Route.ActionArgs): Promise<Response> {
  return logout(request);
}

/**
 * Loader function for the logout route.
 * Redirects to the login page if accessed directly.
 *
 * @param {Route.LoaderArgs} params - The loader arguments.
 * @returns {Response} Redirect response to the login page.
 * @see https://reactrouter.com/en/dev/route/loader
 */
export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return redirect("/login");
}
