/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DashboardConfigSchema100 {
  /**
   * Number of tiles columns.
   */
  numberColumns?: number;
  /**
   * Number of tiles rows.
   */
  numberRows?: number;
  /**
   * One of predefined skins...
   */
  initSkin?: "Male" | "Female";
  /**
   * Enable/disable display of time tile.
   */
  timeTile?: boolean;
  /**
   * Number of enabled logos
   */
  enableLogo?: number;
  disableNames?: string[];
  disableAtypes?: string[];
  [k: string]: any;
}