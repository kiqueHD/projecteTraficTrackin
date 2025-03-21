package com.example.traffictracking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Trafico {
    private int gid;
    private String denominacion;
    private int estado;

    public int getGid() { return gid; }
    public void setGid(int gid) { this.gid = gid; }

    public String getDenominacion() { return denominacion; }
    public void setDenominacion(String denominacion) { this.denominacion = denominacion; }

    public int getEstado() { return estado; }
    public void setEstado(int estado) { this.estado = estado; }
}
