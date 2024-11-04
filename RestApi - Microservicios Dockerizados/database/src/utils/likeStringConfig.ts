export default function likeStringConfig(string: string, exact: boolean = false) {
    return exact ? `${string}` : `%${string}%`;
  }