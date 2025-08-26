import { AppError } from '../Protocols';

export class HeaderMissingError extends AppError {
  constructor(
    header: string,
    i18n: {
      key?: string;
      lang?: string;
      placeholders?: Record<string, string | number>;
    } = {},
  ) {
    super({
      message: `Header "${header}" is mandatory.`,
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.HeaderMissingError',
        placeholders: {
          header,
          ...(i18n?.placeholders ? i18n.placeholders : {}),
        },
      },
      name: 'HeaderMissingError',
      target: header,
    });
  }
}
