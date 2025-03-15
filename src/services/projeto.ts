import axios from "axios";

const PRISMIC_API = "https://portfoliogbelliu.cdn.prismic.io/api/v1/documents/search";
const REF = "ZgwA2REAACQALHtI"; // Token de referência (verifique se é atualizado automaticamente)

/**
 * Busca um ou todos os projetos do Prismic
 * @param id (opcional) - ID do documento a ser buscado
 * @returns Dados do(s) projeto(s)
 */
export async function fetchProjetoData(id?: string) {
  let url = `${PRISMIC_API}?ref=${REF}`;

  // Se um ID for passado, filtra pelo documento específico
  if (id) {
    url += `&q=[[at(document.id, "${id}")]]`;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar projeto${id ? ` com ID ${id}` : ""}:`, error);
    throw error;
  }
}

/**
 * Busca um projeto específico pelo UID no Prismic
 * @param uid - UID do projeto no Prismic
 * @returns Dados do projeto encontrado
 */
export async function fetchProjetoByUid(uid: string) {
  const url = `${PRISMIC_API}?ref=${REF}&q=[[at(my.teste.uid, "${uid}")]]`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar projeto com UID ${uid}:`, error);
    throw error;
  }
}
