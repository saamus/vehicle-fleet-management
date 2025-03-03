import { Fleet } from './Fleet'
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn()
  id: string
  @Column()
  name!: string

  @Column()
  email!: string

  // One-to-many relationship with Fleet
  @OneToMany(() => Fleet, (fleet) => fleet.user)
  fleets!: Fleet[]

  constructor(id: string, name: string, email: string) {
    this.id = id
    this.name = name
    this.email = email
  }
}
