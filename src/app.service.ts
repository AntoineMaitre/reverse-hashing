import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pattern } from './pattern.entity';

const letters = 'acdegilmnoprstuw';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Pattern)
    private readonly patternRepository: Repository<Pattern>,
  ) {
  }

  /**
   * @description Implementation of the hash method
   * @param incomingString: the string to hash
   */
  hashMethod(incomingString: string): number {
    let h = 7;
    for (let i = 0; i < incomingString.length; i++) {
      h = (h * 37 + letters.indexOf(incomingString[i]));
      console.log(h);
    }
    return h;
  }

  /**
   * @description function allowing to brute force the hash method to find the given string
   * based on the providedHash
   */
  async resolve(providedHash: number): Promise<string> {
    // Init hash
    let hash: number = 0;

    // reverse the hash method: brute force
    while (hash !== providedHash) {
      /**
       * init a `generatedString` first
       * /!\ Watch out for the pattern.entity.ts file to match the strLength, might crash the server if it differs /!\
       */
      const generatedString = await this.generateString(10);

      // Hash the previously generated string
      hash = this.hashMethod(generatedString);

      // save generated string and its hash into the DB for further use
      await this.patternRepository.save({ name: generatedString, hash });

      // If hash matches the provided hash, then return the generated string
      if (hash === providedHash) {
        console.log('holy yesss !!! => ' + generatedString);
        return generatedString;
      }
    }
  }

  /**
   * @description Function allowing us to initialize a 10 letters string based on the allowed characters
   *    We check against the `noMatchingPatterns` retrieved from DB that the randomly generated string
   *    has not been tested yet, so we avoid duplicate testing :)
   * @param strLength The desired length of the string to generate
   */
  async generateString(strLength: number) {
    // we initialize a string to be filled later
    let initialString = 'gotocrisi';
    // init an array of patterns to avoid testing
    let noMatchingPatterns: any[];

    // Get the already checked patterns from the DB and map the results to get only the array of names from db
    const dbPatterns = await this.patternRepository.find();
    noMatchingPatterns = dbPatterns.map(pattern => pattern.name);

    // pick given number of random letters from array of allowed letters
    while (initialString.length < strLength) {
      initialString += letters[Math.floor(Math.random() * letters.length)];
    }

    // if emptyString is included in the already tested array of string, generate another one
    if (_.includes(noMatchingPatterns, initialString)) {
      await this.generateString(strLength);
    }
    console.log(initialString);
    // return the finally generated string
    return initialString;
  }
}
