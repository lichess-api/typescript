import * as account from "./account";

function inject<T>(group: T): T {
  return group;
}

class Lichess {
  account = inject(account);

  constructor() {}
}

export { Lichess };
