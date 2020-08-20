import {MigrationInterface, QueryRunner} from "typeorm";

export class init1597807189529 implements MigrationInterface {
    name = 'init1597807189529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address_ship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "address" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_828b75e5cee248a411de19b770b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "avatar" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "url2" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_50e36da9d45349941038eaf149d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "parentId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_news" ("commentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "newsId" uuid NOT NULL, "parentId" uuid, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_222f808271476e30e6fd50dae75" PRIMARY KEY ("commentId"))`);
        await queryRunner.query(`CREATE TABLE "comments_product" ("commentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "productId" uuid NOT NULL, "parentId" uuid, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_13d1d834fde0b6ae5226b8095e3" PRIMARY KEY ("commentId"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "addressId" uuid NOT NULL, "totalQuantity" integer NOT NULL, "totalAmount" integer NOT NULL, "status" integer NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderId" uuid NOT NULL, "productId" uuid NOT NULL, "name" character varying NOT NULL, "unitPrice" integer NOT NULL, "quantity" integer NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "status" boolean NOT NULL, "description" character varying NOT NULL, "categoryId" uuid NOT NULL, "brandId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "comments_product"`);
        await queryRunner.query(`DROP TABLE "comments_news"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "avatar"`);
        await queryRunner.query(`DROP TABLE "address_ship"`);
    }

}
