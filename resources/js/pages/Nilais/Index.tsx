"use client"

import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, Mapel, Sekolah, Siswa, User } from "@/types"
import { Head } from "@inertiajs/react"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Input Nilai",
    href: "nilais",
  },
]

export default function Index({ korektor, mapels }: { korektor: User; mapels: Mapel[] }) {
  const [selectedSekolah, setSelectedSekolah] = useState<string>("")
  const [selectedMapel, setSelectedMapel] = useState<string>("")
  const [displayedStudents, setDisplayedStudents] = useState<Siswa[]>([])
  const [sekolahs, setSekolahs] = useState<Sekolah[]>([])

  // Extract kecamatan and gugus from user data
  const kecamatanNama = korektor.user_profile.kecamatan.nama
  const gugusValue = korektor.user_profile.guguses.gugus

  // Initialize schools from user data
  useEffect(() => {
    if (korektor && korektor.user_profile && korektor.user_profile.guguses) {
      setSekolahs(korektor.user_profile.guguses.sekolahs || [])
    }
  }, [korektor])

  // Handle OK button click
  const handleOkClick = () => {
    if (!selectedSekolah || !selectedMapel) return

    const sekolahId = Number.parseInt(selectedSekolah)
    const mapelId = Number.parseInt(selectedMapel)

    // Find the selected school
    const school = sekolahs.find((s) => s.id === sekolahId)
    if (!school) return

    // Get students from the selected school
    const students = school.siswas.map((siswa) => {
      // Find existing nilai for this mapel if it exists
      const existingNilai = siswa.nilais.find((n) => n.mapel_id === mapelId)

      return {
        ...siswa,
        tempNilai: existingNilai ? existingNilai.nilai : "",
      }
    })

    setDisplayedStudents(students)
  }

  // Handle nilai change
  const handleNilaiChange = (id: number, value: string) => {
    setDisplayedStudents((students) =>
      students.map((student) => (student.id === id ? { ...student, tempNilai: value } : student)),
    )
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare data for submission
    const submissionData = displayedStudents.map((student) => ({
      siswa_id: student.id,
      mapel_id: Number.parseInt(selectedMapel),
      nilai: student.tempNilai || "",
    }))

    console.log("Data to submit:", submissionData)
    // Here you would send the data to your backend
    alert("Data submitted successfully!")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Input Nilai" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
          {/* Info Table */}
          <div className="overflow-hidden rounded-md border mb-6">
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="border-r bg-gray-50 p-2 font-medium">Kecamatan</td>
                  <td className="border-r bg-gray-50 p-2 font-medium">Gugus</td>
                </tr>
                <tr>
                  <td className="border-r p-2">{kecamatanNama}</td>
                  <td className="p-2">{gugusValue}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Selection Controls */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="mapel-select">Mata Pelajaran</Label>
                    <Select value={selectedMapel} onValueChange={setSelectedMapel}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Mapel" />
                    </SelectTrigger>
                    <SelectContent>
                        {mapels.map((mapel) => (
                        <SelectItem key={mapel.id} value={mapel.id.toString()}>
                            {mapel.nama}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sekolah-select">Sekolah</Label>
                    <Select value={selectedSekolah} onValueChange={setSelectedSekolah}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Sekolah" />
                    </SelectTrigger>
                    <SelectContent>
                        {sekolahs.map((sekolah) => (
                        <SelectItem key={sekolah.id} value={sekolah.id.toString()}>
                            {sekolah.nama}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end">
                    <Button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={handleOkClick}
                    disabled={!selectedSekolah || !selectedMapel}
                    >
                    OK
                    </Button>
                </div>
            </div>

            {/* Student Data Table - Only show if students are loaded */}
            {displayedStudents.length > 0 && (
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader className="bg-gray-200">
                    <TableRow>
                      <TableHead className="w-[60px] text-center font-bold">No.</TableHead>
                      <TableHead className="font-bold">Nama</TableHead>
                      <TableHead className="font-bold">NISN</TableHead>
                      <TableHead className="font-bold">Nilai</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedStudents.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell>{student.nama}</TableCell>
                        <TableCell>{student.nisn}</TableCell>
                        <TableCell>
                          <Input
                            value={student.tempNilai || ""}
                            onChange={(e) => handleNilaiChange(student.id, e.target.value)}
                            className="w-full"
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {displayedStudents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="py-4 text-center">
                          No students found for the selected school and subject.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Submit Button - Only show if students are loaded */}
            {displayedStudents.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Submit
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
