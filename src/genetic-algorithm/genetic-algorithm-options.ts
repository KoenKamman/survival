import { Chromosome } from "./chromosome";

export interface GeneticAlgorithmOptions {
    populationSize?: number;
    mutationChance?: number;
    mutateInitialPopulation?: boolean;
    chromosomeFactory: () => Chromosome;
    fitnessFunction: (chromosome: Chromosome) => number;
    selectionFunction: (population: Chromosome[]) => Chromosome[];
    crossOverFunction: (population: Chromosome[]) => Chromosome[];
    mutationFunction: (chromosome: Chromosome) => Chromosome;
}
