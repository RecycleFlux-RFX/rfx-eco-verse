You are a highly skilled backend engineer. Your task is to build the complete backend for **RFX EcoVerse** using **Node.js, Express, and MongoDB**. Follow best practices for security, scalability, and maintainability.

## Core Setup
- Use **Express.js** for API routing.
- Use **MongoDB with Mongoose** for database models.
- Implement **JWT authentication** for login/signup.
- Add **Role-Based Access Control (RBAC)** with roles: `user`, `admin`, `super_admin`.
- Add **.env configuration** for secrets, DB connection, and API keys.
- Implement **health check endpoints** (`/health`, `/api/health`) returning `{ status: "ok", uptime, timestamp }`.
- Add **robust error handling** and **input validation** for all routes.
- Add **logging & monitoring hooks**.
- Passwords must be hashed with bcrypt.
- All endpoints must return consistent JSON responses.

## API Routes (Full Coverage)

### Authentication & User Management
- `POST /api/auth/signup` – Register new user (10 RFX bonus).
- `POST /api/auth/login` – Login and return JWT.
- `POST /api/auth/forgot-password` – Send reset link.
- `POST /api/auth/reset-password` – Reset password with token.
- `GET /api/user/profile` – Get logged-in user profile.
- `PATCH /api/user/profile` – Update user profile.

### User Features
- `GET /api/user/wallet` – Wallet balance + transactions.
- `GET /api/user/referrals` – Referral details + rewards.
- `GET /api/user/notifications` – Get notifications.
- `PATCH /api/user/notifications/:id/read` – Mark one notification as read.
- `PATCH /api/user/notifications/mark-all-read` – Mark all as read.

### Games
- `GET /api/games` – List available games.
- `POST /api/games/:id/play` – Record gameplay and award RFX/xp.

### Campaigns
- `GET /api/campaigns` – List active/upcoming campaigns.
- `GET /api/campaigns/:id` – Get single campaign details.
- `POST /api/campaigns/:id/participate` – Join campaign.
- `POST /api/campaigns/:id/record-action` – Record eco action (tree planted, recycling, etc.).

### NFTs
- `GET /api/nfts` – List marketplace NFTs or user’s collection.
- `GET /api/nfts/:id` – NFT details.
- `POST /api/nfts/:id/buy` – Purchase NFT with RFX.

### Leaderboard
- `GET /api/leaderboard` – Leaderboard with filters (xp, rfx, co2).

### Dashboards
- **User Dashboard** → `GET /api/user/dashboard-summary`
- **Admin Dashboard** → `GET /api/admin/dashboard-summary`
- **Super Admin Dashboard** → `GET /api/super-admin/dashboard-summary`

### Admin Routes
- `GET /api/admin/users` – Manage users.
- `GET /api/admin/users/:id` – View user details.
- `PATCH /api/admin/users/:id` – Update user info/role.
- `DELETE /api/admin/users/:id` – Delete user.
- `GET /api/admin/campaigns` – Manage campaigns.
- `POST /api/admin/campaigns` – Create campaign.
- `PATCH /api/admin/campaigns/:id` – Update campaign.
- `DELETE /api/admin/campaigns/:id` – Delete campaign.
- `GET /api/admin/submissions/pending` – List pending submissions.
- `POST /api/admin/submissions/:id/approve` – Approve submission.
- `POST /api/admin/submissions/:id/reject` – Reject submission.

### Super Admin Routes
- `GET /api/super-admin/settings` – Platform settings.
- `PATCH /api/super-admin/settings` – Update settings.
- `GET /api/super-admin/admins` – Manage admins.
- `POST /api/super-admin/admins` – Add admin.
- `PATCH /api/super-admin/admins/:id` – Update admin.
- `DELETE /api/super-admin/admins/:id` – Remove admin.

## Data Models
Implement Mongoose models for:
- User (id, email, username, role, xp, rfxBalance, co2Saved, achievements, referralCode, avatar, joinedAt).
- Campaign.
- Game.
- NFT.
- Transaction.
- Notification.
- Submission.
- PlatformSetting.

## Final Notes
- API must be **modularized** (routes/controllers/services).
- Add **seed scripts** for test data (users, campaigns, NFTs).
- Ensure all dashboards return **aggregated stats**.
- Everything must be **production-ready, mobile-first, and scalable**.
