import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserNuevo, Users } from 'src/interfaces/users';
import { Asignatura } from 'src/interfaces/Asignatura';
import { justificacion } from 'src/interfaces/justificacion';
import { environment } from 'src/environments/environment';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;  // Define la URL base para simplificar las llamadas HTTP

  constructor(private httpclient: HttpClient) { }

  // Comprobar si está autenticado
  IsLoggedIn(): boolean {
    return sessionStorage.getItem('username') != null;
  }

  // Obtener un usuario por nombre de usuario
  getByUsername(usuario: string): Observable<Users> {
    return this.httpclient.get<Users>(`${this.apiUrl}/usuarios/?username=${usuario}`);
  }

  // Actualizar un usuario por ID
  updateUser(id: number, userData: any): Observable<any> {
    return this.httpclient.put(`${this.apiUrl}/usuariosDoc/${id}`, userData);
  }

  // Subir imagen de perfil
  uploadProfileImage(userUsuario: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', image);
    
    return this.httpclient.put(`${this.apiUrl}/usuarios/${userUsuario}/profile-image`, formData, {
      headers: { 'enctype': 'multipart/form-data' }
    });
  }

  // Guardar asignaturas seleccionadas
  saveSelectedAsignaturas(data: any): Observable<any> {
    return this.httpclient.post(`${this.apiUrl}/Asignatura`, data);
  }

  // Obtener todas las asignaturas
  getAllAsignaturas(): Observable<Asignatura[]> {
    return this.httpclient.get<Asignatura[]>(`${this.apiUrl}/Asignatura`).pipe(
      catchError(err => {
        console.error('Error al obtener las asignaturas:', err);
        return of([]);
      })
    );
  }

  // Obtener todas las justificaciones
  getAllJustificaciones(): Observable<justificacion[]> {
    return this.httpclient.get<justificacion[]>(`${this.apiUrl}/Justificacion`).pipe(
      catchError(err => {
        console.error('Error al obtener las justificaciones:', err);
        return of([]);
      })
    );
  }

  // Guardar justificación
  guardarJustificacion(justificacion: { fecha: string; motivo: string }): Observable<any> {
    return this.httpclient.post<any>(`${this.apiUrl}/Justificacion`, justificacion).pipe(
      catchError(err => {
        console.error('Error al guardar la justificación:', err);
        return of(null);
      })
    );
  }

  // Eliminar justificación
  eliminarJustificacion(id: string): Observable<any> {
    return this.httpclient.delete(`${this.apiUrl}/Justificacion/${id}`).pipe(
      catchError(err => {
        console.error('Error al eliminar la justificación:', err);
        return of(null);
      })
    );
  }

  // Obtener todos los profesores
  getAllProfesores(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${this.apiUrl}/usuariosDoc`);
  }

  // Registrar un nuevo profesor
  registerProfesor(newProfesor: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<UserNuevo>(`${this.apiUrl}/usuariosDoc`, newProfesor);
  }

  // Obtener profesor por nombre de usuario
  getProfesorByUsuario(usuario: string): Observable<Users | undefined> {
    return this.getAllProfesores().pipe(
      map(profesores => profesores.find(profesor => profesor.username === usuario)),
      catchError(err => {
        console.error('Error en getProfesorByUsuario:', err);
        return of(undefined);
      })
    );
  }

  // Obtener profesor por username (más eficiente)
  getProfesorByUsername(username: string): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${this.apiUrl}/usuariosDoc`).pipe(
      map(profesores => profesores.filter(profesor => profesor.username === username)),
      catchError(err => {
        console.error('Error en getProfesorByUsername:', err);
        return of([]);
      })
    );
  }

  // Registrar un nuevo usuario docente
  postUsuarioDoc(usuario: UserNuevo): Observable<any> {
    return this.httpclient.post(`${this.apiUrl}/usuariosDoc`, usuario);
  }

  // Obtener justificación por ID
  getJustificaciones(): Observable<justificacion[]> {
    return this.httpclient.get<justificacion[]>(`${this.apiUrl}/Justificacion`);
  }

  // Agregar comentario a una justificación
  agregarComentario(id: string, comentario: string): Observable<justificacion | null> {
    return this.httpclient.get<any>(`${this.apiUrl}/Justificacion/${id}`).pipe( // Obtener la justificación existente (cambiado a any temporalmente)
      switchMap((justificacionExistente) => {
        if (!justificacionExistente) {
          console.error('No se encontró la justificación con el id:', id);
          return of(null); // Si no se encuentra la justificación, retorna null
        }
        
        // Crear un nuevo objeto de justificación con el comentario actualizado, pero manteniendo el resto de los campos
        const justificacionActualizada: justificacion = {
          ...justificacionExistente,  // Mantén todos los campos existentes
          comentario: comentario  // Actualiza solo el campo comentario
        };
        
        // Ahora realiza la actualización en el backend
        return this.httpclient.put<justificacion>(`${this.apiUrl}/Justificacion/${id}`, justificacionActualizada);
      }),
      catchError(err => {
        console.error('Error al agregar el comentario:', err);
        return of(null); // Devuelve null en caso de error
      })
    );
  }
  
}
