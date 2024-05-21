import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryDTO } from '../models/category.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = environment.baseUrl + 'categorias';
  constructor(private http:HttpClient) { }

  list(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(this.api);
  }

  searchCategory(categoria: string): Observable<any> {
    return this.http.get<any>(this.api + '/searchcategory/' + categoria);
  }

  save(post: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(this.api, post);
  }
  
  update(put: CategoryDTO): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>(this.api, put);
  }

  delete(destroy: CategoryDTO): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>(this.api + '/delete', destroy);
  }
}