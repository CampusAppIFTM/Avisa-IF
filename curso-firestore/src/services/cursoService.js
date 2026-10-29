import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
 
// Precisa ser igual ao ID digitado no console
export const ID_DO_CURSO = 'Turma1';
 
export async function buscarCurso(cursoId = ID_DO_CURSO) {
  const referencia = doc(db, 'Turmas', cursoId);
  const documento = await getDoc(referencia);
 
  if (!documento.exists()) {
    throw new Error(
      `Documento "${cursoId}" não encontrado na coleção cursos.`
    );
  }
 
  return { id: documento.id, ...documento.data() };
}

