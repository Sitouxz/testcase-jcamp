import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import useTitle from '../../hooks/useTitle';
import Dropdown from '../../components/Dropdown';
import { dummyData } from './dummyData';

// Generic fetch function to avoid repetition
const fetchData = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

// Fetch functions
const fetchProvinces = () =>
  fetchData('http://apikab.jcamp.pt/public/api/v1/reference/provinces');
const fetchRegencies = (provinceId: string) =>
  fetchData(
    `http://apikab.jcamp.pt/public/api/v1/reference/regencies_of/${provinceId}`
  );
const fetchDistricts = (regencyId: string) =>
  fetchData(
    `http://apikab.jcamp.pt/public/api/v1/reference/districts_of/${regencyId}`
  );
const fetchVillages = (districtId: string) =>
  fetchData(
    `http://apikab.jcamp.pt/public/api/v1/reference/villages_of/${districtId}`
  );

const PageSelect: React.FC = () => {
  useTitle('Layout 3 Desktop', 'Layout 3 Tablet', 'Layout 3 Mobile');

  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedRegency, setSelectedRegency] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<number | null>(null);

  const { data: provinces, isLoading: isLoadingProvinces } = useQuery(
    'provinces',
    fetchProvinces
  );
  const { data: regencies, isLoading: isLoadingRegencies } = useQuery(
    ['regencies', selectedProvince],
    () => fetchRegencies(selectedProvince!.toString()),
    { enabled: !!selectedProvince }
  );
  const { data: districts, isLoading: isLoadingDistricts } = useQuery(
    ['districts', selectedRegency],
    () => fetchDistricts(selectedRegency!.toString()),
    { enabled: !!selectedRegency }
  );
  const { data: villages, isLoading: isLoadingVillages } = useQuery(
    ['villages', selectedDistrict],
    () => fetchVillages(selectedDistrict!.toString()),
    { enabled: !!selectedDistrict }
  );

  const filteredContent = dummyData.filter((content) => {
    const filterMap: Record<string, any[]> = {
      village: villages,
      district: districts,
      regency: regencies,
      province: provinces
    };

    const selectedIdMap: Record<string, number | null> = {
      village: selectedVillage,
      district: selectedDistrict,
      regency: selectedRegency,
      province: selectedProvince
    };

    for (const [key, value] of Object.entries(selectedIdMap)) {
      if (value) {
        return (
          content.title ===
          filterMap[key]?.find(
            (item: { id: number; name: string }) => item.id === value
          )?.name
        );
      }
    }

    return false;
  });

  const handleSelectionChange =
    (
      setter: React.Dispatch<React.SetStateAction<number | null>>,
      clearState: () => void
    ) =>
    (value: number | null) => {
      setter(value);
      clearState();
    };

  return (
    <div className='container mx-auto p-4 '>
      <div className='flex gap-14 flex-col lg:flex-row'>
        <div className='w-full lg:w-1/4 bg-neutral-100 p-4 rounded-xl'>
          <h2 className='text-gray-800 text-lg font-bold tracking-tight'>
            Filter
          </h2>
          <div className='mt-5 mb-4'>
            <span className='text-gray-800 text-sm font-semibold tracking-tight mb-2'>
              Provinsi
            </span>
            <Dropdown
              options={provinces || []}
              selectedOption={selectedProvince || -1}
              onSelect={handleSelectionChange(setSelectedProvince, () => {
                setSelectedRegency(null);
                setSelectedDistrict(null);
                setSelectedVillage(null);
              })}
              label='Provinsi'
              loading={isLoadingProvinces}
              defaultOption='Select Province'
            />
          </div>
          <div className='mb-4'>
            <span className='text-gray-800 text-sm font-semibold tracking-tight mb-2'>
              Kabupaten
            </span>
            <Dropdown
              options={regencies || []}
              selectedOption={selectedRegency || -1}
              onSelect={handleSelectionChange(setSelectedRegency, () => {
                setSelectedDistrict(null);
                setSelectedVillage(null);
              })}
              label='Kab/Kota'
              loading={isLoadingRegencies}
              disabled={!selectedProvince}
              defaultOption='Select Regency'
            />
          </div>
          <div className='mt-5 mb-4'>
            <span className='text-gray-800 text-sm font-semibold tracking-tight mb-2'>
              Kecamatan
            </span>
            <Dropdown
              options={districts || []}
              selectedOption={selectedDistrict || -1}
              onSelect={handleSelectionChange(setSelectedDistrict, () => {
                setSelectedVillage(null);
              })}
              label='Kecamatan'
              loading={isLoadingDistricts}
              disabled={!selectedRegency}
              defaultOption='Select District'
            />
          </div>
          <div className='mt-5 mb-4'>
            <span className='text-gray-800 text-sm font-semibold tracking-tight mb-2'>
              Desa
            </span>
            <Dropdown
              options={villages || []}
              selectedOption={selectedVillage || -1}
              onSelect={handleSelectionChange(setSelectedVillage, () => {})}
              label='Desa'
              loading={isLoadingVillages}
              disabled={!selectedDistrict}
              defaultOption='Select Village'
            />
          </div>
        </div>
        <div className='w-full lg:w-3/4'>
          <div>
            {filteredContent.length ? (
              filteredContent.map((content, index) => (
                <div key={index} className='rounded-xl shadow border '>
                  <div className='p-5 flex-col justify-between gap-4 flex h-full'>
                    <h2 className='text-gray-800 text-lg font-bold tracking-tight'>
                      {content.title}
                    </h2>
                    <p className='self-stretch text-gray-500 text-base font-medium leading-normal tracking-tight'>
                      {content.content}
                    </p>
                    <p className='text-gray-500 text-sm font-semibold leading-tight tracking-tight'>
                      {content.lastUpdate}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No content available for the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSelect;
