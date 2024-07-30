export interface UIPDefaultConfigs {
  root: {
    darkTheme?: boolean;
  };

  editor: {
    label?: string;
    copy?: boolean;
    collapsible?: boolean;
    resizable?: boolean;
  };

  settings: {
    dirToggle?: boolean;
    themeToggle?: boolean;
    collapsible?: boolean;
    resizable?: boolean;
    hideable?: boolean;
  };
}

export class UIPDefaults {
  protected static defaultConfigs: Partial<UIPDefaultConfigs> = {};

  public static applyDefaults(config?: Partial<UIPDefaultConfigs>): void {
    Object.assign(this.defaultConfigs, config);
  }

  public static for<T extends keyof UIPDefaultConfigs>(key: T): Partial<UIPDefaultConfigs[T]> {
    return this.defaultConfigs[key] || {};
  }
}
