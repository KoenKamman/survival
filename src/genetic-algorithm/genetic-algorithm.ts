import { GeneticAlgorithmOptions } from "./genetic-algorithm-options";
import { Chromosome } from "./chromosome";

export class GeneticAlgorithm {
    private _population: Chromosome[];

    private _populationSize: number;
    private _mutationChance: number;
    private _mutateInitialPopulation: boolean;
    private _chromosomeFactory: () => Chromosome;
    private _fitnessFunction: (chromosome: Chromosome) => number;
    private _selectionFunction: (population: Chromosome[]) => Chromosome[];
    private _crossOverFunction: (population: Chromosome[]) => Chromosome[];
    private _mutationFunction: (chromosome: Chromosome) => Chromosome;

    public constructor(options: GeneticAlgorithmOptions) {
        this._populationSize = options.populationSize ?? 100;
        this._mutationChance = options.mutationChance ?? 0.1;
        this._mutateInitialPopulation = options.mutateInitialPopulation ?? false;
        this._chromosomeFactory = options.chromosomeFactory;
        this._fitnessFunction = options.fitnessFunction;
        this._selectionFunction = options.selectionFunction;
        this._crossOverFunction = options.crossOverFunction;
        this._mutationFunction = options.mutationFunction;
    }

    public get population() { return this._population; }

    public evolve(): void {
        if (!this.population) this._generateInitialPopulation();
        this._population = this._selectionFunction(this._population);
        const offspring = this._crossOverFunction(this._population).map(this._mutate);
        this._population.concat(offspring);
        this._population.forEach(chromosome => chromosome.fitness = this._fitnessFunction(chromosome));
    }

    public reset(): void {
        this._population = [];
    }

    private _generateInitialPopulation(): void {
        this._population = Array(this._populationSize).map(() => {
            let chromosome = this._chromosomeFactory();
            if (this._mutateInitialPopulation) chromosome = this._mutate(chromosome);
            chromosome.fitness = this._fitnessFunction(chromosome);
            return chromosome;
        });
    }

    private _mutate(chromosome: Chromosome): Chromosome {
        return this._mutationChance >= Math.random() ? this._mutationFunction(chromosome) : chromosome;
    }
}
