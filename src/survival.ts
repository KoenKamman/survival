import { GeneticAlgorithm } from "./genetic-algorithm/genetic-algorithm";
import { SurvivalOptions } from "./options";

export const survival = (options: SurvivalOptions): GeneticAlgorithm => new GeneticAlgorithm(options);

export * from './options';
export * from './genetic-algorithm/chromosome';
export * from './genetic-algorithm/genetic-algorithm';
export * from './genetic-algorithm/genetic-algorithm-options';
