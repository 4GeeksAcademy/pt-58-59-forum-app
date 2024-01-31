const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      access_token: null,
      threads: [],
      userdata: {},
      current_thread: {},
    },
    actions: {
      data: {
        dehydrate: () => {
          if (getStore().access_token) {
            sessionStorage.setItem("access_token", getStore().access_token);
          }
        },

        rehydrate: () => {
          if (sessionStorage.getItem("access_token")) {
            setStore({
              access_token: sessionStorage.getItem("access_token"),
            });
          }
        },
      },

      auth: {
        login: async (formData) => {
          let urlFormData = new URLSearchParams();
          for (let [k, v] of formData) {
            urlFormData.append(k, v);
          }

          const resp = await fetch(
            "https://4geeks.dotlag.space/forum/auth/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: urlFormData,
            }
          );
          if (resp.ok) {
            const data = await resp.json();
            setStore({ access_token: data.access_token });
            getActions().data.dehydrate();
          }
        },

        signup: async (formData) => {
          let signUpData = {};
          for (let [k, v] of formData) {
            signUpData[k] = v;
          }

          const resp = await fetch("https://4geeks.dotlag.space/forum/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpData),
          });
          if (resp.ok) {
            formData.delete("email");
            await getActions().auth.login(formData);
          }
        },

        generateHeaders: () => {
          return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStore().access_token}`,
          };
        },
      },

      threads: {
        create: async (title, content) => {
          const resp = await fetch(
            `https://4geeks.dotlag.space/forum/threads/`,
            {
              method: "POST",
              headers: getActions().auth.generateHeaders(),
              body: JSON.stringify({
                title: title,
                content: content,
              }),
            }
          );
          if (resp.ok) {
            const data = await resp.json();
            return data;
          }
        },

        readMany: async (limit = 10, offset = 0) => {
          const resp = await fetch(
            `https://4geeks.dotlag.space/forum/threads/?limit=${limit}&offset=${offset}`
          );
          if (resp.ok) {
            const data = await resp.json();
            setStore({ threads: data.threads });
          }
        },

        read: async (thread_id) => {
          const resp = await fetch(
            `https://4geeks.dotlag.space/forum/threads/${thread_id}`
          );
          if (resp.ok) {
            const data = await resp.json();
            setStore({ current_thread: data });
          }
        },
      },

      posts: {
        create: async (thread_id, content) => {
          const resp = await fetch(
            `https://4geeks.dotlag.space/forum/posts/replyto/${thread_id}`,
            {
              method: "POST",
              headers: getActions().auth.generateHeaders(),
              body: JSON.stringify({
                content: content,
              }),
            }
          );
          if (resp.ok) {
            const data = await resp.json();
            return data;
          }
        },
      },
    },
  };
};

export default getState;
