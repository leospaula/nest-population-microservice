import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PopulationService {
  constructor(private http: HttpService){}

  async getPopulationData(code) {
    return lastValueFrom(this.http.get('https://servicodados.ibge.gov.br/api/v1/projecoes/populacao/' + code)
            .pipe(
                map(response => response.data.projecao.populacao)
            ))
  }
}