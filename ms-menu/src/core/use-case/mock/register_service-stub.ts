import { IRegisterService } from '../../../port/output/iregister_service';

export class RegisterServiceStub implements IRegisterService {
  async register(): Promise<void> {
    return Promise.resolve();
  }
}
