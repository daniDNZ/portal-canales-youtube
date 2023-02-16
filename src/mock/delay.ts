export const delay = async (data: any, ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
  return data;
};