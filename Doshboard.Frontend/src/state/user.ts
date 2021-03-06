import { authHeader } from "@/state/index";
import { parseJwt } from "@/router/index"

export const user = {
    namespaced: true,
    state: {
        token: null,
    },
    mutations: {
        login(state, token) {
            state.token = token;
        }
    },
    actions: {
        async login({ commit }, json) {
            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(json)
              });
            if (res.status == 500)
                return { error: "Backend unavailable" }
            const { token, error, errors } = await res.json();
            commit('login', token);
            return { error, errors };
        },
        async googleLogin({ commit }, code) {
            const res = await fetch("/api/user/login/google?" + new URLSearchParams({code: code}), {
                method: "POST"
              });
            if (res.status == 500)
                return { error: "Backend unavailable" }
            const { token, error, errors } = await res.json();
            commit('login', token);
            return { error, errors };
        },
        async logout({ commit }) {
            commit('login', null);
        },
        async register({ commit }, json) {
            const res = await fetch("/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(json)
            })
            if (res.status == 500)
                return { error: "Backend unavailable" }
            const { error, errors } = await res.json();
            return {error, errors };
        },
        del({ commit }, id) {
            fetch("/api/user/delete?" + new URLSearchParams({ id: id }), {
                method: "DELETE",
                headers: authHeader()
            })
        },
        promote({ commit }, id) {
            fetch("/api/user/promote?" + new URLSearchParams({ id: id }), {
                method: "PATCH",
                headers: authHeader()
            })
        },
        async all({ commit }) {
            const res = await fetch("/api/user", {
                method: "GET",
                headers: authHeader()
            });
            return await res.json();
        }
    },
    getters: {
        isLoggedIn(state) : Boolean {
            return !!state.token;
        },
        isAdmin(state) : Boolean {
            return (!!state.token && parseJwt(state.token).role == "Admin")
        },
        token(state) {
            return state.token;
        }
    }
}
