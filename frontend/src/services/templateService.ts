import { Template } from "../types";
import { handleApiCall } from "../utils";
import api from "./api";

export const createTemplate = async (dataTemplate: Template) =>
  await handleApiCall(api.post("/template/create", dataTemplate));

export const updateTemplate = async (dataTemplate: Template) =>
  await handleApiCall(api.put("/template/update", dataTemplate));

export const getTemplates = async () =>
  await handleApiCall(api.get(`/template/getTemplates`));

export const deleteTemplate = async (templateId: string) =>
  await handleApiCall(api.delete(`/template/delete/${templateId}`));

