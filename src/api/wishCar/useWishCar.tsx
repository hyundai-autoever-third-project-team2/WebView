import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchViewIsHeartCarList } from 'api/mypage/mypageApi';
import { addWishCar, deleteWishCar } from './wishCarApi';

const useWishCar = (carId: number) => {
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  const addWishCarMutation = useMutation({
    mutationFn: () => addWishCar(carId),
    onMutate: async (carId: number) => {
      await queryClient.cancelQueries({ queryKey: ['wishCar'] });
      const previousWishCar = queryClient.getQueryData<number[]>(['wishCar']);
      console.log(previousWishCar);
      queryClient.setQueryData(['wishCar'], (old: number[] = []) => [...old, carId]);
      return { previousWishCar };
    },
    onError: (_error, _carId, context) => {
      queryClient.setQueryData(['wishCar'], context?.previousWishCar);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishCar'] });
    },
  });

  const deleteWishCarMutation = useMutation({
    mutationFn: () => deleteWishCar(carId),
    onMutate: async (carId: number) => {
      await queryClient.cancelQueries({ queryKey: ['wishCar'] });
      const previousWishCar = queryClient.getQueryData<number[]>(['wishCar']);
      queryClient.setQueryData(['wishCar'], (old: number[] = []) => old.filter((id) => id !== carId));
      return { previousWishCar };
    },
    onError: (_error, _carId, context) => {
      queryClient.setQueryData(['wishCar'], context?.previousWishCar);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishCar'] });
    },
  });

  useEffect(() => {
    const checkIsLiked = async () => {
      if (!carId) return;
      const isHeartCarList = await fetchViewIsHeartCarList();
      setIsLiked(isHeartCarList.some((car) => car.carId === carId));
    };

    checkIsLiked();
  }, [carId]);

  const toggleLike = () => {
    if (!carId) return;

    setIsLiked((prev) => !prev);

    if (!isLiked) {
      addWishCarMutation.mutate(carId, {
        onError: () => {
          setIsLiked(false);
        },
      });
    } else {
      deleteWishCarMutation.mutate(carId, {
        onError: () => {
          setIsLiked(true);
        },
      });
    }
  };

  return {
    isLiked,
    toggleLike,
    isLoading: addWishCarMutation.isPending || deleteWishCarMutation.isPending,
  };
};

export default useWishCar;
