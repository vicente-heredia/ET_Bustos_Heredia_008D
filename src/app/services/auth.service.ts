import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserNuevo, Users } from 'src/interfaces/users';
import { Asignatura } from 'src/interfaces/Asignatura';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  // Obtener todos los usuarios
  getAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  // Registrar un nuevo usuario
  registerUser(newUser: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<UserNuevo>(`${environment.apiUrl}/usuarios`, newUser);
  }

  // Guardar un nuevo usuario
  postUsuario(newUsuario: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  // Obtener un usuario por su nombre de usuario
  getByUsuario(usuario: string): Observable<Users | undefined> {
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.username === usuario)),
      catchError(err => {
        console.error('Error en getByUsuario:', err);
        return of(undefined);  
      })
    );
  }

  // Actualizar un usuario por ID
  updateUser(id: number, userData: any): Observable<any> {
    return this.httpclient.put(`http://localhost:3300/usuarios/${id}`, userData);
  }
  
  // Subir imagen de perfil
  uploadProfileImage(userUsuario: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', image);

    return this.httpclient.put(`${environment.apiUrl}/usuarios/${userUsuario}/profile-image`, formData, {
      headers: {
        'enctype': 'multipart/form-data'
      }
    });
  }

  // Obtener un usuario por nombre de usuario
  getByUsername(usuario: any): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?username=${usuario}`);
  }

  // Comprobar si está autenticado
  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  // Guardar asignaturas seleccionadas
  saveSelectedAsignaturas(data: any): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/Asignatura`, data);
  }

  // Obtener todas las asignaturas
  getAllAsignaturas(): Observable<Asignatura[]> {
    return this.httpclient.get<Asignatura[]>(`${environment.apiUrl}/Asignatura`).pipe(
      catchError(err => {
        console.error('Error al obtener las asignaturas:', err);
        return of([]);
      })
    );
  }

 
  getAllJustificaciones(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${environment.apiUrl}/Justificacion`); // Cambia la URL según tu estructura
  }

  
  guardarJustificacion(justificacion: { fecha: string; motivo: string }): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiUrl}/Justificacion`, justificacion).pipe(
      catchError(err => {
        console.error('Error al guardar la justificación:', err);
        return of(null);
      })
    );
  }
  
  // auth.service.ts
eliminarJustificacion(id: string): Observable<any> {
  return this.httpclient.delete(`http://localhost:3300/Justificacion/${id}`);
}

  
  
}

  


  

