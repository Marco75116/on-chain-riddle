export const copyToClipboard = async (text?: string): Promise<void> => {
  try {
    if (text) {
      return navigator.clipboard.writeText(text);
    }
  } catch (error) {
    console.error("Error while copying address", error);
  }
};
