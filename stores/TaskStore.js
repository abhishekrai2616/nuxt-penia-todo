import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";
import * as Realm from "realm-web";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    app: null,
    mongo: null,
    collection: null,
  }),

  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },

    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },

    totalCount: (state) => {
      return state.tasks.length;
    },
  },

  actions: {
    async initialize() {
      const config = useRuntimeConfig();
      this.app = new Realm.App({ id: config.public.realmAppId });
	  console.log(config.public.realmApiKey)
      const credentials = Realm.Credentials.apiKey(config.public.realmApiKey);
      const user = await this.app.logIn(credentials);
      this.mongo = this.app.currentUser.mongoClient("mongodb-atlas");
      this.collection = this.mongo.db("todo").collection("todos");
      await this.loadTasks();
    },

    async loadTasks() {
		console.log("i got here")
      if (!this.collection) return;
	  console.log("yes///")
      const todos = await this.collection.find();
      this.tasks = todos;
    },

    async addTask(task) {
      if (!this.collection) return;
	  console.log(task)
      await this.collection.insertOne(task);
      this.tasks.push(task);
    },

    async deleteTask(id) {
      if (!this.collection) return;
      await this.collection.deleteOne({ _id: new Realm.BSON.ObjectId(id) });
      this.tasks = this.tasks.filter((task) => task._id !== id);
    },

    async toggleFav(id) {
      const task = this.tasks.find((task) => task._id === id);
      if (!task) return;
      task.isFav = !task.isFav;
      await this.collection.updateOne(
        { _id: new Realm.BSON.ObjectId(id) },
        { $set: { isFav: task.isFav } }
      );
    },
  },
});
