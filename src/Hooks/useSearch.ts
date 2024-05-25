import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormSchema, FormSchemaType } from '@/schema';

type Campaign = {
  id: string;
  title: string;
  period: string;
  conditions: string;
};

export const useSearch = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('/api/getAllCampaigns');
        setCampaigns(response.data);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };
    fetchCampaigns();
  }, []);

  const { register, handleSubmit, watch } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search_name: '',
      type: '',
      campaign: [],
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const query = new URLSearchParams({
        search_name: data.search_name,
        type: data.type || '',
        campaign: data.campaign ? data.campaign.join(',') : '',
      }).toString();
      router.push(`search?${query}`);
    } catch (err) {
      console.error('Error submitting search:', err);
    }
  };

  const formData = watch();

  return {
    register,
    handleSubmit,
    onSubmit,
    campaigns,
    formData,
  };
};
