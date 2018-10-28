import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pattern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column('bigint')
  hash: number;
}
