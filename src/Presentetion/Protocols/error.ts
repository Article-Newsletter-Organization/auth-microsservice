export abstract class AppError extends Error {
  message: string;
  name: string;
  target?: string;
  stack?: string;
  issues: AppError[];

  constructor(attrs: {
    message: string;
    name: string;
    target?: string;
    stack?: string;
    issues?: AppError[];
  }) {
    super(attrs.message);
    this.name = attrs.name;
    this.message = attrs.message;
    this.target = attrs.target;
    this.stack = attrs.stack;
    this.issues = attrs.issues ?? [];
  }

  toString() {
    return `Error: ${this.message} - ${Date.now().toString()} \n Stack: \n${
      this.stack
    }`;
  }

  getHttpReponse(
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
          : AppError.issuesFormatter(this.issues),
    };
  }

  static issuesFormatter(issues: AppError[]) {
    return issues.map((issue) => {
      return issue.getHttpReponse();
    });
  }
}
