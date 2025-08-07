import { AuthDirectoryService } from "@external/auth-directory/auth-directory.service";
import { Module } from "@nestjs/common";

/**
 * AuthDirectoryModule is a module that serves as a base for integrating with an external authentication directory.
 */

@Module({
	providers: [AuthDirectoryService],
	exports: [AuthDirectoryService],
})
export class AuthDirectoryModule {}
