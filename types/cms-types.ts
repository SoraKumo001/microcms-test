type Reference<T, R> = T extends 'get' ? R : string | null;
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

type Structure<T, P> = T extends 'get'
  ? { id: string } & DateType & Required<P>
  : Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type contents<T='get'> = Structure<
T,
{
  /**
   * タイトル
   */
  title?: string
  /**
   * 本文
   */
  body?: string
  /**
   * 表示
   */
  visible?: boolean
}>


export interface EndPoints {
  get: {
    contents: contents<'get'>
  }
  post: {
    contents: contents<'post'>
  }
  put: {
    contents: contents<'put'>
  }
  patch: {
    contents: contents<'patch'>
  }
}
