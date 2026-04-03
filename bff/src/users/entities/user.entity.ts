import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { FavoritePokemon } from '../../favorites/entities/favorite-pokemon.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    clerkUserId: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => FavoritePokemon, (favoritePokemon) => favoritePokemon.user)
    favoritePokemons: FavoritePokemon[];
}