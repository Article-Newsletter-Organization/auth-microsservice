import { i18nOptions, I18nService } from '../i18n/i18n.service';

export abstract class AppError extends Error {
  message: string;
  name: string;
  target?: string;
  stack?: string;
  issues: AppError[];
  i18n: i18nOptions;

  constructor(attrs: {
    message: string;
    name: string;
    i18n: i18nOptions;
    target?: string;
    stack?: string;
    issues?: AppError[];
  }) {
    super();

    this.name = attrs.name;
    this.message = attrs.message;
    this.target = attrs.target;
    this.stack = attrs.stack;
    this.issues = attrs.issues ?? [];
    this.i18n = attrs.i18n;
  }

  toString() {
    return `Error: ${this.message} - ${Date.now().toString()} \n Stack: \n${
      this.stack
    }`;
  }

  getLog(
    issuesFormatter?: (issues: AppError[]) => (object | number | string)[],
  ) {
    return {
      message: this.message,
      name: this.name,
      target: this.target,
      stack: this.stack,
      issues:
        issuesFormatter && this.issues.length > 0
          ? issuesFormatter(this.issues)
          : this.issuesFormatter(this.issues),
    };
  }

  getHttpReponse(
    issuesFormatter?: (issues: AppError[]) => (object | number | string)[],
    lang?: string,
  ) {
    const i18nService = I18nService.getInstance();

    let msg = i18nService.t(this.i18n.key, lang, this.i18n.placeholders);

    if (!msg) {
      msg = i18nService.t(
        this.i18n.key,
        this.i18n.lang,
        this.i18n.placeholders,
      );
    }

    return {
      message: msg ?? this.message,
      name: this.name,
      target: this.target,
      issues:
        issuesFormatter && this.issues.length > 0
          ? issuesFormatter(this.issues)
          : this.issuesFormatter(this.issues),
    };
  }

  issuesFormatter(issues: AppError[]) {
    return issues.map((issue) => issue.getHttpReponse());
  }
}
