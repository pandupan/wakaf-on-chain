import { toast } from 'sonner';

function useAxiosErrorToast() {
  const handleAxiosErrorToast = (code: number) => {
    switch (code) {
      case 401:
        toast.error('Invalid kredensial');
        break;
      case 400:
        toast.error('Input tidak valid');
        break;
      case 404:
        toast.error('Data tidak ditemukan');
        break;
      default:
        toast.error('Internal Error');
        break;
    }
  }

  return {
    handleAxiosErrorToast
  }
}

export default useAxiosErrorToast