import { Comments } from "./model/comments";

(async() => {
  await Comments.sync({ force: true });
})();