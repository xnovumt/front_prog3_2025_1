import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuotasService } from 'src/app/services/cuotasService/cuotas.service';
import { Cuotas } from 'src/app/models/cuotas.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
    @ViewChild('paymentForm') paymentForm!: NgForm;

    cuota: Cuotas = {}; // Para almacenar los datos de la cuota
    cuotaId: string = '';

    paymentData = {
        card: {
            number: '',
            exp_year: '',
            exp_month: '',
            cvc: ''
        },
        customer: {
            name: '',
            last_name: '',
            email: '',
            phone: '',
            doc_number: ''
        },
        due: {
            id: '',
            id_servicio: '',
            valor: ''
        },
        description: '',
        tax: '',
        tax_base: '',
        dues: ''
    };

    constructor(private cuotasService: CuotasService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.cuotaId = this.route.snapshot.params['id']; // Este es el due_id (id_servicio)
        this.paymentData.due.id = this.cuotaId; // ✅ CORRECTO - el due.id es el parámetro de la URL
        console.log('Due ID (id_servicio):', this.cuotaId);

        // Cargar los datos de la cuota para mostrar información
        this.loadCuotaDataByServiceId();
    }

    loadCuotaDataByServiceId(): void {
        // Buscar la cuota por id_servicio en lugar del ID de la cuota
        this.cuotasService.list().subscribe({
            next: (cuotas) => {
                const cuotaEncontrada = cuotas.find(c => c.id_servicio?.toString() === this.cuotaId);
                if (cuotaEncontrada) {
                    this.cuota = cuotaEncontrada;
                    // Pre-llenar los datos de la cuota
                    this.paymentData.due.id_servicio = cuotaEncontrada.id_servicio?.toString() || '';
                    this.paymentData.due.valor = cuotaEncontrada.valor?.toString() || '';
                    console.log('Cuota encontrada:', this.cuota);
                } else {
                    console.error('No se encontró cuota con id_servicio:', this.cuotaId);
                    Swal.fire('Error', 'No se encontró la cuota especificada.', 'error');
                }
            },
            error: (error) => {
                console.error('Error cargando las cuotas:', error);
                Swal.fire('Error', 'No se pudo cargar la información de la cuota.', 'error');
            }
        });
    }

    pay() {
        this.cuotasService.pay(this.paymentData).subscribe({
            next: (response) => {
                Swal.fire('Éxito', 'Pago procesado exitosamente.', 'success');
                console.log('Payment response:', response);
            },
            error: (error) => {
                Swal.fire('Error', 'Hubo un problema al procesar el pago.', 'error');
                console.error('Payment error:', error);
            }
        });
    }

    onSubmit() {
        // Datos de la tarjeta
        this.paymentData.card.number = this.paymentForm.value.cardNumber;
        this.paymentData.card.exp_month = this.paymentForm.value.expMonth;
        this.paymentData.card.exp_year = this.paymentForm.value.expYear;
        this.paymentData.card.cvc = this.paymentForm.value.cvc;

        // Datos del cliente
        this.paymentData.customer.name = this.paymentForm.value.customerName;
        this.paymentData.customer.last_name = this.paymentForm.value.lastName;
        this.paymentData.customer.email = this.paymentForm.value.email;
        this.paymentData.customer.phone = this.paymentForm.value.phone;
        this.paymentData.customer.doc_number = this.paymentForm.value.docNumber;

        // NO sobrescribir los datos de la cuota, ya están pre-llenados desde ngOnInit y loadCuotaData
        // this.paymentData.due.id = this.cuotaId; // Ya está asignado en ngOnInit
        // this.paymentData.due.id_servicio y valor ya están asignados en loadCuotaData

        // Otros datos del pago
        this.paymentData.description = this.paymentForm.value.description;
        this.paymentData.tax = parseInt(this.paymentForm.value.tax, 10).toString();
        this.paymentData.tax_base = parseInt(this.paymentForm.value.taxBase, 10).toString();
        this.paymentData.dues = parseInt(this.paymentForm.value.dues, 10).toString();

        console.log('Datos enviados:', this.paymentData);
        this.pay();
    }
}
