import { Injectable } from '@nestjs/common';
import { CreateAdminSettingDto } from './dto/create-admin-setting.dto';
import { UpdateAdminSettingDto } from './dto/update-admin-setting.dto';

@Injectable()
export class AdminSettingsService {
  create(createAdminSettingDto: CreateAdminSettingDto) {
    return { action: 'create', payload: createAdminSettingDto };
  }

  findAll() {
    return { items: [] };
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateAdminSettingDto: UpdateAdminSettingDto) {
    return { action: 'update', id, payload: updateAdminSettingDto };
  }

  remove(id: number) {
    return { action: 'remove', id };
  }
}
