using Application.DTOs;
using Application.DTOs.OwnerDTOs;
using Application.Interfaces;
using Application.Utils;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class OwnerService : IOwnerService
    {
        private readonly IUnitOfWork _unitOfWork;
        public OwnerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<OwnerAdminTableDTO> CreateNewOneOwnerAsync(Owner owner)
        {
            owner.FullName = StringHanlder.CapitalizeFirstLetterOfEachWord(owner.FullName);
            var ownerCreated = await _unitOfWork.OwnerRepository.CreateNewOneOwer(owner);
            return ownerCreated == null ? new OwnerAdminTableDTO() :
            new OwnerAdminTableDTO
            {
                Id = ownerCreated.Id,
                FullName = ownerCreated.FullName,
                Address = ownerCreated.Address,
                DateOfBirth = ownerCreated.DateOfBirth,
                PhoneNumber = ownerCreated.PhoneNumber,
                Gender = ownerCreated.Gender,
                IsLocked = ownerCreated.IsLocked,
            };
        }

        public Task<Owner?> FindByOwnerIdAsync(int id)
        {
            return _unitOfWork.OwnerRepository.GetOwnerByIdAsync(id);
        }

        public async Task<ResponseDatatable<OwnerAdminTableDTO>> GetOwnersAdminTableAsync(int pageIndex, int pageSize = 10)
        {
            var (owners, totalRecords) = await _unitOfWork.OwnerRepository.GetOwnersAdminTableAsync(pageIndex, pageSize);
            var query = owners
                .Select(owner => new OwnerAdminTableDTO
                {
                    Id = owner.Id,
                    FullName = owner.FullName,
                    Address = owner.Address,
                    DateOfBirth = owner.DateOfBirth,
                    PhoneNumber = owner.PhoneNumber,
                    Gender = owner.Gender,
                    IsLocked = owner.IsLocked,
                });
            var ownersAdminTable = query.ToList();
            return new ResponseDatatable<OwnerAdminTableDTO>(totalRecords, ownersAdminTable, pageSize);
        }

        public async Task<ResponseDatatable<OwnerAdminTableDTO>> GetOwnersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10)
        {
            var (owners, totalRecords) = await _unitOfWork.OwnerRepository.GetOwnersAdminTableBySearchAsync(key, pageIndex, pageSize);
            var query = owners
                .Select(owner => new OwnerAdminTableDTO
                {
                    Id = owner.Id,
                    FullName = owner.FullName,
                    Address = owner.Address,
                    DateOfBirth = owner.DateOfBirth,
                    PhoneNumber = owner.PhoneNumber,
                    Gender = owner.Gender,
                    IsLocked = owner.IsLocked,
                });
            var ownersAdminTable = query.ToList();
            return new ResponseDatatable<OwnerAdminTableDTO>(totalRecords, ownersAdminTable, pageSize);
        }

        public async Task<IEnumerable<OwnerSelectDTO>> GetOwnersSelectAsync()
        {
            var owners = await _unitOfWork.OwnerRepository.GetAllOwnersAsync();
            var query = owners
                .Select(owner => new OwnerSelectDTO { 
                    Id = owner.Id,
                    FullName = owner.FullName,
                });
            return query.ToList();
        }

        public async Task<OwnerAdminTableDTO?> UpdateLockedAsync(int id)
        {
            var owner = await _unitOfWork.OwnerRepository.GetOwnerByIdAsync(id);
            if(owner == null)
            {
                return null;
            }
            if (owner.IsLocked.HasValue)
            {
                owner.IsLocked = owner.IsLocked == 0 ? (short)1 : (short)0;
            }
            else
            {
                owner.IsLocked = 0;
            }
            await _unitOfWork.SaveChangeAsync();
            return new OwnerAdminTableDTO
            {
                Id = owner.Id,
                FullName = owner.FullName,
                Address = owner.Address,
                DateOfBirth = owner.DateOfBirth,
                PhoneNumber = owner.PhoneNumber,
                Gender = owner.Gender,
                IsLocked = owner.IsLocked,
            };
        } 

        public async Task<OwnerAdminTableDTO?> UpdateOneOwnerAsync(int id, Owner owner)
        {
            var ownerExist = await _unitOfWork.OwnerRepository.GetOwnerByIdAsync(id);
            if(ownerExist == null)
            {
                return null;
            } else
            {
                ownerExist.FullName = owner.FullName;
                ownerExist.Address = owner.Address;
                ownerExist.PhoneNumber = owner.PhoneNumber;
                ownerExist.Gender = owner.Gender;
                ownerExist.DateOfBirth = owner.DateOfBirth;
                ownerExist.IsLocked = owner.IsLocked;
                ownerExist.Username = owner.Username;
                ownerExist.HashedPassword = owner.HashedPassword;
                await _unitOfWork.OwnerRepository.UpdateOneOwner(ownerExist);
                return new OwnerAdminTableDTO
                {
                    Id = ownerExist.Id,
                    FullName = ownerExist.FullName,
                    Address = ownerExist.Address,
                    DateOfBirth = ownerExist.DateOfBirth,
                    PhoneNumber = ownerExist.PhoneNumber,
                    Gender = ownerExist.Gender,
                    IsLocked = ownerExist.IsLocked,
                };
            }
        }
    }
}
