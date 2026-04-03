import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
    CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('favorite_pokemon')
@Unique(['user', 'pokemonName'])
export class FavoritePokemon {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    pokemonName: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.favoritePokemons, { onDelete: 'CASCADE' })
    user: User;
}