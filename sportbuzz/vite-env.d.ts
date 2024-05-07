// Create a custom type declaration file (e.g., custom.d.ts) in your project

// custom.d.ts

interface ImportMeta {
  readonly env: {
    [key: string]: string | undefined;
  };
}
