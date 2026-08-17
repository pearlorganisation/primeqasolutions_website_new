export interface ContactFormData {
  fullname: string;
  company?: string;
  email: string;
  phone_no?: string;
  how_we_can_help: string;
  cf_token?: string;
}

export interface ContactFormResponse {
  id: number;
  documentId: string;
  fullname: string;
  company: string | null;
  email: string;
  phone_no: string | null;
  how_we_can_help: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
