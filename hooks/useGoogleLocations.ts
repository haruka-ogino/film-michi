import { searchGoogleLocation } from '@/api/google-location'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useSearchGoogle() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: searchGoogleLocation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['googleLocations'] }),
  })
}
