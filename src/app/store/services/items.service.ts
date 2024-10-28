import { Injectable } from '@angular/core';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Store } from '@ngrx/store';
import { items as actions } from '@store/actions';
import { generateRandomString } from '@utils';

const aleatoryNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

@Injectable({ providedIn: 'root' })
export class ItemsService {
  constructor(private store: Store) {
    //not to do
  }

  private handleFakeData() {
    const data: any[] = Array.from({ length: 2000 }, (_, i) => {
      const name = faker.commerce.product();
      const category = i % 2 === 0 ? 'TRUCK' : 'PLANE';
      const quantity = aleatoryNumber(1, 2000);
      const price = faker.finance.amount();
      const status = Math.random() > 0.5 ? true : false;

      return {
        id: generateRandomString(10),
        name,
        category,
        quantity,
        price,
        status
      };
    });

    this.store.dispatch(actions.upsertAll({ data }));
  }

  public generateFakeData() {
    this.handleFakeData();
  }
}
