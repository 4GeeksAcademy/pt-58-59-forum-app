const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      access_token: null,
      threads: [],
      userdata: {},
      current_thread: {},
    },
    actions: {
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
      },

      threads: {
        create: async () => {
          //
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
        create: async () => {
          //
        },
      },
    },
  };
};

export default getState;
