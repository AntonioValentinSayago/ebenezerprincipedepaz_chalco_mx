import { useMutation } from '@tanstack/react-query';
import { createMember } from '../api/DevEbenezerApi';

export const useCreateMember = () => {
  return useMutation({
    mutationFn: createMember,
  });
};